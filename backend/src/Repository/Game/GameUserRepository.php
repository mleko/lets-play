<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;

use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\ValueObject\Uuid;

interface GameUserRepository
{
    /**
     * @param Uuid $userId
     * @return GameUser[]
     */
    public function getUserGames(Uuid $userId);

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return GameUser
     */
    public function getGameUser(Uuid $userId, Uuid $gameId): ?GameUser;

    public function save(GameUser $gameUser);

    /**
     * @param Uuid $gameId
     * @return GameUser[]
     */
    public function getGameUsers(Uuid $gameId);

    /**
     * @return GameUser[]
     */
    public function getAll();
}
