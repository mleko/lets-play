<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Security;


use Mleko\LetsPlay\Repository\UserRepository;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class UserActorProvider implements UserProviderInterface
{
    /** @var UserRepository */
    private $userRepository;

    /**
     * UserActorProvider constructor.
     * @param UserRepository $userRepository
     */
    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    /**
     * @inheritDoc
     */
    public function loadUserByUsername($username) {
        $user = $this->userRepository->findUserByEmail($username);
        if (!$user) {
            throw new UsernameNotFoundException();
        }
        return new UserActor($user);
    }

    /**
     * @inheritDoc
     */
    public function refreshUser(UserInterface $user) {
        return $this->loadUserByUsername($user->getUsername());
    }

    /**
     * @inheritDoc
     */
    public function supportsClass($class) {
        return $class === UserActor::class;
    }

}
