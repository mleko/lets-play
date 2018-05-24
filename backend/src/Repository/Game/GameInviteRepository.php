<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Repository\StorageRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameInviteRepository extends StorageRepository
{

    public function listGameInvites(Uuid $gameId) {
        $elements = $this->getElements();
        return \array_filter($elements, function (GameInvite $invite) use ($gameId) {
            return $invite->getGameId()->equals($gameId);
        });
    }

    public function findGameInvite(Uuid $gameId, string $email): ?GameInvite {
        $elements = $this->getElements();
        /** @var GameInvite $invite */
        foreach ($elements as $invite) {
            if (\strcasecmp($email, $invite->getEmail()) === 0 && $invite->getGameId()->equals($gameId)) {
                return $invite;
            }
        }
        return null;
    }

    public function save(GameInvite $invite) {
        if ($this->findGameInvite($invite->getGameId(), $invite->getEmail())) {
            return;
        }
        $elements = $this->getElements();
        $elements[] = $invite;
        $this->saveElements($elements);
    }

    public function remove(Uuid $gameId, string $email) {
        $elements = $this->getElements();
        $elements = \array_values(\array_filter($elements, function (GameInvite $invite) use ($gameId, $email) {
            return !$invite->getGameId()->equals($gameId) || 0 !== \strcasecmp($invite->getEmail(), $email);
        }));
        $this->saveElements($elements);
    }

    protected function getElementClassName(): string {
        return GameInvite::class;
    }

    protected function getStorageKey(): string {
        return "game.invites";
    }
}
