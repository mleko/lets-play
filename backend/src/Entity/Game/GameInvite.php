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
    /** @var string */
    private $email;
    /** @var Uuid */
    private $gameId;
    /** @var int */
    private $status;

    /**
     * GameInvite constructor.
     * @param string $email
     * @param Uuid $gameId
     * @param Uuid $id
     * @param int $status
     */
    public function __construct(string $email, Uuid $gameId, Uuid $id = null, int $status = self::STATUS_PENDING) {
        $this->id = $id ?: new Uuid();
        $this->email = $email;
        $this->gameId = $gameId;
        $this->status = $status;
    }

}
