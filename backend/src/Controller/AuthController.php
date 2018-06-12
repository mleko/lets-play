<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\UserRepository;
use Mleko\LetsPlay\Security\UserActor;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

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

    public function register(Request $request, JWTTokenManagerInterface $manager) {
        $data = \json_decode($request->getContent(), true);

        $password = $data["password"];
        if (\strlen($password) < 7) {
            return new Response(["message" => "Password must be at least 7 characters long"], false, 400);
        }
        $email = $data["email"];
        if (false === \filter_var($email, \FILTER_VALIDATE_EMAIL)) {
            return new Response(["message" => "Email must be valid"], false, 400);
        }
        $user = new User($data["name"], User::hashEmail($email), password_hash($password, PASSWORD_BCRYPT));
        $this->userRepository->saveUser($user);

        $token = $manager->create(new UserActor($user));

        return new \Symfony\Component\HttpFoundation\JsonResponse(["token" => $token]);
    }
}
