<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Security;


use Mleko\LetsPlay\Entity\User;
use Symfony\Component\Security\Core\User\UserInterface;

class UserActor implements UserInterface
{
    /** @var User */
    private $user;

    /**
     * UserActor constructor.
     * @param User $user
     */
    public function __construct(User $user) {
        $this->user = $user;
    }

    /**
     * @return User
     */
    public function getUser(): User {
        return $this->user;
    }

    /**
     * @inheritdoc
     */
    public function getRoles() {
        return [];
    }

    /**
     * @inheritDoc
     */
    public function getPassword() {
        return $this->user->getPassHash();
    }

    /**
     * @inheritDoc
     */
    public function getSalt() {
        return null;
    }

    /**
     * @inheritDoc
     */
    public function getUsername() {
        return $this->user->getEmail();
    }

    /**
     * @inheritDoc
     */
    public function eraseCredentials() {
        // noop
    }

}
