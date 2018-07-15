<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Repository\MatchSetRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineMatchSetRepository implements MatchSetRepository
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
        $this->entityRepository = $entityManager->getRepository(MatchSet::class);
    }

    public function save(MatchSet $matchSet) {
        $this->entityManager->persist($matchSet);
        $this->entityManager->flush();
    }

    /**
     * @return MatchSet[]
     */
    public function getSets(): array {
        return $this->entityRepository->findAll();
    }

    public function getSet(Uuid $setId): ?MatchSet {
        return $this->entityRepository->find($setId);
    }

    public function getUserSets(User $user, $includePublic = false) {
        return $this->entityRepository->createQueryBuilder("sets")
            ->where("sets.ownerId = :userId OR sets.public = :true")
            ->getQuery()
            ->setParameter("userId", $user->getId())
            ->setParameter("true", true)
            ->getResult();
    }
}
