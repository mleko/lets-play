<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\ValueObject\Uuid;

interface UserRepository
{
    public function saveUser(User $user);

    public function getUser(Uuid $id): ?User;

    public function findUserByEmail(string $email): ?User;

    /**
     * @return User[]
     */
    public function getUsers(): array;

    /**
     * @param Uuid[] $userIds
     * @return array|User[]
     */
    public function getMany(array $userIds);
}
