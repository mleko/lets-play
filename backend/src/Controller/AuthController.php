<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\UserRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthController
{
    /** @var UserRepository */
    private $userRepository;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getAuth(UserInterface $user) {
        /** @var User $user */
        $user = $user->getUser();
        return new Response($user);
    }

    public function login(Request $request) {
        $data = \json_decode($request->getContent(), true);
        $user = $this->userRepository->findUserByEmail($data["email"]);
        if (!\password_verify($data["password"], $user->getPassHash())) {
            return new JsonResponse([], 403);
        }
        return new \Symfony\Component\HttpFoundation\JsonResponse(
            [
                "data" =>
                    [
                        "id"   => $user->getId()->getUuid(),
                        "name" => $user->getName(),
                    ]
            ]
        );
    }

    public function register(Request $request) {
        $data = \json_decode($request->getContent(), true);

        $user = new User($data["name"], $data["email"], password_hash($data["password"], PASSWORD_BCRYPT));
        $this->userRepository->saveUser($user);
        return new \Symfony\Component\HttpFoundation\JsonResponse(
            [
                "data" =>
                    [
                        "id"   => $user->getId()->getUuid(),
                        "name" => $user->getName(),
                    ]
            ]
        );
    }
}
