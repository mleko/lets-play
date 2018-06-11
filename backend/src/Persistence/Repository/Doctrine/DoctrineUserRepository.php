<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Repository\UserRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineUserRepository implements UserRepository
{
    /** @var EntityRepository */
    private $entityRepository;
    /** @var EntityManagerInterface */
    private $entityManager;

    /**
     * DoctrineUserRepository constructor.
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(EntityManagerInterface $entityManager) {
        $this->entityManager = $entityManager;
        $this->entityRepository = $entityManager->getRepository(User::class);
    }


    public function saveUser(User $user) {
        $this->entityManager->persist($user);
        $this->entityManager->flush();
    }

    public function getUser(Uuid $id): ?User {
        return $this->entityRepository->find($id->getUuid());
    }

    public function findUserByEmail(string $email): ?User {
        if (false !== \strpos($email, "@")) {
            $email = User::hashEmail($email);
        }
        return $this->entityRepository->findOneBy(["emailHash" => $email]);
    }

    /**
     * @return User[]
     */
    public function getUsers(): array {
        $this->entityRepository->findAll();
    }

    /**
     * @param Uuid[] $userIds
     * @return array|User[]
     */
    public function getMany(array $userIds) {
        return $this->entityRepository->findBy(["id" => $userIds]);
    }
}
