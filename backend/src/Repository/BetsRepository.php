<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\ValueObject\Uuid;

interface BetsRepository
{
    public function save(Bet $bet);

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return Bet[]|array
     */
    public function getUserGameBets(Uuid $userId, Uuid $gameId);

    /**
     * @param Bet[] $bets
     * @param bool $skipSame
     */
    public function saveMany($bets, bool $skipSame);

    public function getGameBets(Uuid $gameId);
}
