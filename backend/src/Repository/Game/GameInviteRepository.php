<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Persistence\Repository\Storage\StorageRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameInviteRepository extends StorageRepository
{

    public function listGameInvites(Uuid $gameId) {
        $elements = $this->getElements();
        return \array_values(\array_filter($elements, function (GameInvite $invite) use ($gameId) {
            return $invite->getGameId()->equals($gameId);
        }));
    }

    public function save(GameInvite $invite) {
        $elements = $this->getElements();
        $elements[$invite->getId()->getUuid()] = $invite;
        $this->saveElements($elements);
    }

    public function getGameInvitation(string $invitationId) {
        /** @var GameInvite[] $elements */
        $elements = $this->getElements();
        return \array_key_exists($invitationId, $elements) ? $elements[$invitationId] : null;
    }

    protected function getElementClassName(): string {
        return GameInvite::class;
    }

    protected function getStorageKey(): string {
        return "game.invites";
    }
}
