<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Mleko\LetsPlay\Entity\Game;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineGameRepository implements GameRepository
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
        $this->entityRepository = $entityManager->getRepository(Game::class);
    }

    public function save(Game $game) {
        $this->entityManager->persist($game);
        $this->entityManager->flush();
    }

    public function getGames() {
        return $this->entityRepository->findAll();
    }

    public function getGame(string $gameId): ?Game {
        return $this->entityRepository->find($gameId);
    }

    public function getUserGames(Uuid $userId) {
        return $this->entityRepository->createQueryBuilder("game")
            ->leftJoin(Game\GameUser::class, "gameUser", Join::WITH, "game.id = gameUser.gameId")
            ->where("game.ownerId = :userId OR gameUser.userId = :userId")
            ->getQuery()
            ->setParameter("userId", $userId)
            ->getResult();
    }
}
