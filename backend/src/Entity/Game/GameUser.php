<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity\Game;


use Mleko\LetsPlay\ValueObject\Uuid;

class GameUser
{

    /** @var Uuid */
    private $gameId;
    /** @var Uuid */
    private $userId;

    /**
     * GameUser constructor.
     * @param Uuid $gameId
     * @param Uuid $userId
     */
    public function __construct(Uuid $gameId, Uuid $userId) {
        $this->gameId = $gameId;
        $this->userId = $userId;
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
    public function getUserId(): Uuid {
        return $this->userId;
    }

}
