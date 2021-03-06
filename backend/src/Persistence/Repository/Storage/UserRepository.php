<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Storage;


use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\ValueObject\Uuid;

class UserRepository extends StorageRepository implements \Mleko\LetsPlay\Repository\UserRepository
{

    public function saveUser(User $user) {
        $existingUser = $this->findUserByEmail($user->getEmailHash());
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
        if (false !== \strpos($email, "@")) {
            $email = User::hashEmail($email);
        }
        $users = $this->getUsers();
        foreach ($users as $user) {
            if ($email === $user->getEmailHash()) {
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
