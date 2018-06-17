<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Doctrine;


use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query\Expr\Join;
use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Repository\BetsRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class DoctrineBetsRepository implements BetsRepository
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
        $this->entityRepository = $entityManager->getRepository(Bet::class);
    }

    public function save(Bet $bet) {
        $this->entityManager->persist($bet);
        $this->entityManager->flush();
    }

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return Bet[]|array
     */
    public function getUserGameBets(Uuid $userId, Uuid $gameId) {
        $query = $this->entityRepository->createQueryBuilder("bets")
            ->leftJoin(Bet::class, "bets2", Join::WITH,
                "bets.userId = bets2.userId AND bets.gameId = bets2.gameId AND bets.matchId = bets2.matchId AND bets.datetime < bets2.datetime")
            ->where("bets.userId = :userId AND bets.gameId = :gameId AND bets2.id IS NULL")
            ->getQuery();
        return $query
            ->setParameters([
                "userId" => $userId,
                "gameId" => $gameId
            ])->getResult();
    }

    /**
     * @param Bet[] $bets
     * @param bool $skipSame
     */
    public function saveMany($bets, bool $skipSame) {
        if (0 === \count($bets)) {
            return;
        }
        $bet = \reset($bets);
        $userId = $bet->getUserId();
        $gameId = $bet->getGameId();
        foreach ($bets as $bet) {
            if (!$bet->getGameId()->equals($gameId) || !$bet->getUserId()->equals($userId)) {
                throw new \LogicException("Save many can save bets for one user and one game at a time");
            }
        }
        $activeBets = $this->getUserGameBets($userId, $gameId);
        foreach ($bets as $bet) {
            $foundMatch = false;
            foreach ($activeBets as $activeBet) {
                $sameMatch = $activeBet->getMatchId()->equals($bet->getMatchId());
                $foundMatch = $foundMatch || $sameMatch;
                if ($sameMatch && !$activeBet->getBet()->equals($bet->getBet())) {
                    $this->entityManager->persist($bet);
                    continue 2;
                }
            }
            if (!$foundMatch) {
                $this->entityManager->persist($bet);
            }
        }
        $this->entityManager->flush();
    }

    public function getGameBets(Uuid $gameId) {
        return $this->entityRepository->createQueryBuilder("bets")
            ->leftJoin(Bet::class, "bets2", Join::WITH,
                "bets.userId = bets2.userId AND bets.gameId = bets2.gameId AND bets.matchId = bets2.matchId AND bets.datetime < bets2.datetime")
            ->where("bets.gameId = :gameId AND bets2.id IS NULL")
            ->getQuery()
            ->setParameters([
                "gameId" => $gameId
            ])->getResult();
    }

    /**
     * @return Bet[]
     */
    public function getAll() {
        return $this->entityRepository->findAll();
    }

    /**
     * @param Uuid $gameId
     * @param Uuid $matchId
     * @return Bet[]
     */
    public function getGameMatchBets(Uuid $gameId, Uuid $matchId) {
        $query = $this->entityRepository->createQueryBuilder("bets")
            ->leftJoin(Bet::class, "bets2", Join::WITH,
                "bets.userId = bets2.userId AND bets.gameId = bets2.gameId AND bets.matchId = bets2.matchId AND bets.datetime < bets2.datetime")
            ->where("bets.matchId = :matchId AND bets.gameId = :gameId AND bets2.id IS NULL")
            ->getQuery();
        return $query
            ->setParameters([
                "matchId" => $matchId,
                "gameId" => $gameId
            ])->getResult();
    }
}
