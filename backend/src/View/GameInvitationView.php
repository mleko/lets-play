<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\View;


use Mleko\LetsPlay\Entity\Game;

class GameInvitationView
{
    /** @var Game\GameInvite */
    private $invitation;
    /** @var Game */
    private $game;

    /**
     * GameInvitationView constructor.
     * @param Game\GameInvite $invitation
     * @param Game $game
     */
    public function __construct(Game\GameInvite $invitation, Game $game) {
        $this->invitation = $invitation;
        $this->game = $game;
    }

    /**
     * @return Game\GameInvite
     */
    public function getInvitation(): Game\GameInvite {
        return $this->invitation;
    }

    /**
     * @return Game
     */
    public function getGame(): Game {
        return $this->game;
    }
}
