<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Entity\Game;

use Mleko\LetsPlay\ValueObject\Uuid;

class GameInvite
{

    public const STATUS_PENDING = 0;
    public const STATUS_ACCEPTED = 1;
    public const STATUS_CANCELED = 2;

    /** @var Uuid */
    private $id;
    /** @var Uuid */
    private $gameId;
    /** @var int */
    private $status;

    /**
     * GameInvite constructor.
     * @param Uuid $gameId
     * @param Uuid $id
     * @param int $status
     */
    public function __construct(Uuid $gameId, Uuid $id = null, int $status = self::STATUS_PENDING) {
        $this->id = $id ?: new Uuid();
        $this->gameId = $gameId;
        $this->status = $status;
    }

    /**
     * @return Uuid
     */
    public function getId(): Uuid {
        return $this->id;
    }

    /**
     * @return Uuid
     */
    public function getGameId(): Uuid {
        return $this->gameId;
    }

    /**
     * @return int
     */
    public function getStatus(): int {
        return $this->status;
    }

    public function cancel(): void {
        $this->status = self::STATUS_CANCELED;
    }

    public function markAccepted(): void {
        $this->status = self::STATUS_ACCEPTED;
    }
}
