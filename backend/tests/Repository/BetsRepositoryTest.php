<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Tests\Repository;

use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Normalizer\DummyNormalizer;
use Mleko\LetsPlay\Persistence\Repository\Storage\BetsRepository;
use Mleko\LetsPlay\ValueObject\MatchScore;
use Mleko\LetsPlay\ValueObject\Uuid;
use PHPUnit\Framework\TestCase;

class BetsRepositoryTest extends TestCase
{

    public function testSaveMany() {
        $repository = new BetsRepository(new \Mleko\LetsPlay\Persistence\Storage\InMemoryStorage([]), new DummyNormalizer());

        $bet = new Bet($userId = new Uuid(), $gameId = new Uuid(), $matchId = new Uuid(), new MatchScore(1, 1));
        $repository->saveMany([$bet], true);
        $bets = $repository->getUserGameBets($userId, $gameId);
        $this->assertCount(1, $bets);

        $newBet = new Bet($userId, $gameId, $matchId, new MatchScore(1, 2));
        $repository->saveMany([$newBet], true);
        $updatedBets = $repository->getUserGameBets($userId, $gameId);
        $this->assertCount(1, $updatedBets);
        $this->assertEquals(2, $updatedBets[0]->getBet()->getAway());
    }

    public function testGetUserGameBets() {
        $repository = new BetsRepository(new \Mleko\LetsPlay\Persistence\Storage\InMemoryStorage([]), new DummyNormalizer());
        $userId = new Uuid();
        $gameId = new Uuid();
        $repository->saveMany([
            new Bet($userId, $gameId, $match1Id = new Uuid(), new MatchScore(1, 1), new \DateTimeImmutable("2018-01-01 11:11:11")),
            new Bet($userId, $gameId, $match1Id, new MatchScore(2, 1), new \DateTimeImmutable("2018-01-02 11:11:11")),
            new Bet($userId, $gameId, $match1Id, new MatchScore(1, 2), new \DateTimeImmutable("2018-01-03 11:11:11")),
            new Bet($userId, $gameId, $match2Id = new Uuid(), new MatchScore(3, 1), new \DateTimeImmutable("2018-01-04 11:11:11")),
            new Bet($userId, $gameId, $match1Id, new MatchScore(1, 1), new \DateTimeImmutable("2018-01-05 11:11:11")),
            new Bet($userId, $gameId, $match2Id, new MatchScore(0, 1), new \DateTimeImmutable("2018-01-06 11:11:11")),
            new Bet($userId, $gameId, $match1Id, new MatchScore(2, 2), new \DateTimeImmutable("2018-01-07 11:11:11")),
        ], false);

        $bets = $repository->getUserGameBets($userId, $gameId);
        $this->assertCount(2, $bets);

        /** @var Bet[] $mBets */
        $mBets = [
            $match1Id->getUuid() => $bets[0]->getMatchId()->equals($match1Id) ? $bets[0] : $bets[1],
            $match2Id->getUuid() => $bets[0]->getMatchId()->equals($match2Id) ? $bets[0] : $bets[1],
        ];
        $this->assertEquals(2, $mBets[$match1Id->getUuid()]->getBet()->getHome());
        $this->assertEquals(2, $mBets[$match1Id->getUuid()]->getBet()->getAway());
        $this->assertEquals(0, $mBets[$match2Id->getUuid()]->getBet()->getHome());
        $this->assertEquals(1, $mBets[$match2Id->getUuid()]->getBet()->getAway());
    }


}
