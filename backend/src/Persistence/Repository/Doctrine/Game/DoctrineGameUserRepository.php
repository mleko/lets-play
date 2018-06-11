<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine\Game;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineGameUserRepository implements GameUserRepository
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
        $this->entityRepository = $entityManager->getRepository(GameUser::class);
    }

    /**
     * @param Uuid $userId
     * @return GameUser[]
     */
    public function getUserGames(Uuid $userId) {
        return $this->entityRepository->findBy(["userId" => $userId]);
    }

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return GameUser
     */
    public function getGameUser(Uuid $userId, Uuid $gameId): ?GameUser {
        return $this->entityRepository->findOneBy(["userId" => $userId, "gameId" => $gameId]);
    }

    public function save(GameUser $gameUser) {
        $this->entityManager->persist($gameUser);
        $this->entityManager->flush();
    }

    /**
     * @param Uuid $gameId
     * @return GameUser[]
     */
    public function getGameUsers(Uuid $gameId) {
        return $this->entityRepository->findBy(["gameId" => $gameId]);
    }

    /**
     * @return GameUser[]
     */
    public function getAll() {
        return $this->entityRepository->findAll();
    }
}
