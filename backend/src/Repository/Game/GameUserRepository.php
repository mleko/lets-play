<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;


use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Repository\StorageRepository;

class GameUserRepository extends StorageRepository
{

    protected function getElementClassName(): string {
        return GameUser::class;
    }

    protected function getStorageKey(): string {
        return "game.user";
    }
}
