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

    public function getUserGameBets(Uuid $gameId, Uuid $userId) {
        $bets = $this->getElements();
        $userGameBets = \array_filter($bets, function (Bet $bet) use ($gameId, $userId) {
            return $bet->getGameId()->getUuid() === $gameId->getUuid() && $bet->getUserId()->getUuid() === $userId->getUuid();
        });
        return $this->filterActive($userGameBets);
    }

    protected function getElementClassName(): string {
        return Bet::class;
    }

    protected function getStorageKey(): string {
        return "bets";
    }

    /**
     * @param Bet[] $userGameBets
     * @return Bet[]
     */
    private function filterActive(array $userGameBets): array {
        /** @var Bet[] $active */
        $active = [];
        foreach ($userGameBets as $bet) {
            $key = $bet->getUserId()->getUuid() . "-" . $bet->getGameId()->getUuid() . "-" . $bet->getMatchId()->getUuid();
            if (!\array_key_exists($key, $active) || $bet->getDatetime()->getTimestamp() > $active[$key]->getDatetime()->getTimestamp()) {
                $active[$key] = $bet;
            }
        }
        return $active;
    }
}
