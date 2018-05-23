<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Repository\StorageRepository;

class GameInviteRepository extends StorageRepository
{

    protected function getElementClassName(): string {
        return GameInvite::class;
    }

    protected function getStorageKey(): string {
        return "game.invite";
    }
}
