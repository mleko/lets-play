<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository\Game;

use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\ValueObject\Uuid;

interface GameInviteRepository
{
    /**
     * @return GameInvite[]
     */
    public function getAll();

    public function listGameInvites(Uuid $gameId);

    public function save(GameInvite $invite);

    public function getGameInvitation(string $invitationId);
}
