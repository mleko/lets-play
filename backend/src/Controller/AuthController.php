<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\UserRepository;
use Mleko\LetsPlay\Security\UserActor;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Guard\AuthenticatorInterface;
use Symfony\Component\Security\Guard\GuardAuthenticatorHandler;

class AuthController
{
    /** @var UserRepository */
    private $userRepository;
    /** @var AuthenticatorInterface */
    private $authenticator;

    /**
     * AuthController constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getAuth(UserActor $user) {
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
                        "id" => $user->getId()->getUuid(),
                        "name" => $user->getName(),
                    ]
            ]
        );
    }

    public function register(Request $request) {
        $data = \json_decode($request->getContent(), true);

        $user = new User($data["name"], $data["email"], password_hash($data["password"], PASSWORD_BCRYPT));
        $this->userRepository->saveUser($user);
        $this->authenticator->createAuthenticatedToken(new UserActor($user), "test");
        /** @var GuardAuthenticatorHandler $h */
        $h = null;
        $h->authenticateUserAndHandleSuccess(
            new UserActor($user),
            $request
        );

        return new \Symfony\Component\HttpFoundation\JsonResponse(
            [
                "data" =>
                    [
                        "id" => $user->getId()->getUuid(),
                        "name" => $user->getName(),
                    ]
            ]
        );
    }
}
