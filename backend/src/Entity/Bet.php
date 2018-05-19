<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity;


use Mleko\LetsPlay\ValueObject\MatchScore;
use Mleko\LetsPlay\ValueObject\Uuid;

class Bet
{
    /** @var Uuid */
    private $userId;
    /** @var Uuid */
    private $gameId;
    /** @var Uuid */
    private $matchId;
    /** @var \DateTimeImmutable */
    private $datetime;
    /** @var MatchScore */
    private $bet;

    /**
     * Bet constructor.
     * @param Uuid $userId
     * @param Uuid $gameId
     * @param Uuid $matchId
     * @param MatchScore $bet
     * @param \DateTimeImmutable|null $date
     */
    public function __construct(Uuid $userId, Uuid $gameId, Uuid $matchId, MatchScore $bet, \DateTimeImmutable $date = null) {
        $this->userId = $userId;
        $this->gameId = $gameId;
        $this->matchId = $matchId;
        $this->bet = $bet;
        $this->datetime = $date ?: new \DateTimeImmutable();
    }

    /**
     * @return Uuid
     */
    public function getUserId(): Uuid {
        return $this->userId;
    }

    /**
     * @return Uuid
     */
    public function getGameId(): Uuid {
        return $this->gameId;
    }

    /**
     * @return Uuid
     */
    public function getMatchId(): Uuid {
        return $this->matchId;
    }

    /**
     * @return \DateTimeImmutable
     */
    public function getDatetime(): \DateTimeImmutable {
        return $this->datetime;
    }

    /**
     * @return MatchScore
     */
    public function getBet(): MatchScore {
        return $this->bet;
    }
}
