<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\ValueObject\Uuid;

class UserRepository
{

    /** @var JsonStorage */
    private $storage;

    /**
     * UserRepository constructor.
     * @param JsonStorage $storage
     */
    public function __construct(JsonStorage $storage) {
        $this->storage = $storage;
    }


    public function saveUser(User $user) {
        $existingUser = $this->findUserByEmail($user->getEmail());
        if (null !== $existingUser && $existingUser->getId()->getUuid() !== $user->getId()->getUuid()) {
            throw new \RuntimeException("Duplicate user");
        }

        $users = $this->getUsers();

        $users[$user->getId()->getUuid()] = [
            'id' => $user->getId()->getUuid(),
            "name" => $user->getName(),
            "email" => $user->getEmail(),
            "hash" => $user->getPassHash()
        ];

        $this->saveUsersData($users);
    }

    public function getUser(Uuid $id) {

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
        $data = $this->storage->getData();
        return \array_map(function ($data) {
            return new User($data["name"], $data["email"], $data["hash"], new Uuid($data["id"]));
        }, $data["users"] ?? []);
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
        return \array_filter($users, function (User $user) use ($userIds) {
            return \in_array($user->getId()->getUuid(), $userIds);
        });
    }

    /**
     * @param array[] $users
     */
    private function saveUsersData(array $users): void {
        $data = $this->storage->getData();
        $data["users"] = $users;
        $this->storage->saveData($data);
    }

}
