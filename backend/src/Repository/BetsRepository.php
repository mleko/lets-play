<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;


use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\ValueObject\Uuid;

class BetsRepository extends StorageRepository
{

    public function save(Bet $bet) {
        $bets = $this->getElements();
        $bets[] = $bet;
        $this->saveElements($bets);
    }

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return Bet[]|array
     */
    public function getUserGameBets(Uuid $userId, Uuid $gameId) {
        $bets = $this->getElements();
        $userGameBets = \array_filter($bets, function (Bet $bet) use ($gameId, $userId) {
            return $bet->getGameId()->getUuid() === $gameId->getUuid() && $bet->getUserId()->getUuid() === $userId->getUuid();
        });
        return \array_values($this->filterActive($userGameBets));
    }

    /**
     * @param Bet[] $bets
     * @param bool $skipSame
     */
    public function saveMany($bets, bool $skipSame) {
        if (0 === \count($bets)) {
            return;
        }
        $elements = $this->getElements();
        $activeBets = $this->filterActive($elements);
        foreach ($bets as $bet) {
            if ($this->shouldSkip($bet, $activeBets, $skipSame)) {
                continue;
            }
            $elements[] = $bet;
        }
        $this->saveElements($elements);
    }

    public function getGameBets(Uuid $gameId) {
        $bets = $this->getElements();
        $userGameBets = \array_filter($bets, function (Bet $bet) use ($gameId) {
            return $bet->getGameId()->getUuid() === $gameId->getUuid();
        });
        return \array_values($this->filterActive($userGameBets));
    }

    protected function getElementClassName(): string {
        return Bet::class;
    }

    protected function getStorageKey(): string {
        return "bets";
    }

    /**
     * @param Bet[] $bets
     * @return Bet[]
     */
    private function filterActive(array $bets): array {
        /** @var Bet[] $active */
        $active = [];
        foreach ($bets as $bet) {
            $key = $this->buildKey($bet);
            if (!\array_key_exists($key, $active) || $bet->getDatetime() > $active[$key]->getDatetime()) {
                $active[$key] = $bet;
            }
        }
        return $active;
    }

    private function buildKey(Bet $bet): string {
        return $bet->getUserId()->getUuid() . "-" . $bet->getGameId()->getUuid() . "-" . $bet->getMatchId()->getUuid();
    }

    /**
     * @param Bet $bet
     * @param Bet[] $activeBets
     * @param bool $skipSame
     * @return bool
     */
    private function shouldSkip(Bet $bet, array $activeBets, bool $skipSame): bool {
        if (!$skipSame) {
            return false;
        }
        $key = $this->buildKey($bet);
        if (!\array_key_exists($key, $activeBets)) {
            return false;
        }
        return $bet->getBet()->equals($activeBets[$key]->getBet());
    }
}
