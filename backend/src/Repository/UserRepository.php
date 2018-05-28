<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\ValueObject\Uuid;

class UserRepository extends StorageRepository
{

    public function saveUser(User $user) {
        $existingUser = $this->findUserByEmail($user->getEmail());
        if (null !== $existingUser && $existingUser->getId()->getUuid() !== $user->getId()->getUuid()) {
            throw new \RuntimeException("Duplicate user");
        }

        $users = $this->getElements();
        $users[$user->getId()->getUuid()] = $user;
        $this->saveElements($users);
    }

    public function getUser(Uuid $id): ?User {
        $users = $this->getElements();
        return $users[$id->getUuid()] ?? null;
    }

    public function findUserByEmail(string $email): ?User {
        $users = $this->getUsers();
        foreach ($users as $user) {
            if (\mb_strtolower($email) === \mb_strtolower($user->getEmail())) {
                return $user;
            }
        }
        return null;
    }

    /**
     * @return User[]
     */
    public function getUsers(): array {
        return $this->getElements();
    }

    /**
     * @param Uuid[] $userIds
     * @return array|User[]
     */
    public function getMany(array $userIds) {
        $userIds = \array_map(function (Uuid $id) {
            return $id->getUuid();
        }, $userIds);
        $users = $this->getUsers();
        return \array_values(\array_filter($users, function (User $user) use ($userIds) {
            return \in_array($user->getId()->getUuid(), $userIds);
        }));
    }

    protected function getElementClassName(): string {
        return User::class;
    }

    protected function getStorageKey(): string {
        return "users";
    }
}
