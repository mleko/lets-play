<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\Game\GameInviteRepository;
use Mleko\LetsPlay\ValueObject\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class InvitesController
{
    /** @var GameInviteRepository */
    private $inviteRepository;

    /**
     * InvitesController constructor.
     * @param GameInviteRepository $inviteRepository
     */
    public function __construct(GameInviteRepository $inviteRepository) {
        $this->inviteRepository = $inviteRepository;
    }

    public function listAll($gameId, UserInterface $user) {
        $invites = $this->inviteRepository->listGameInvites(new Uuid($gameId));
        return new Response($invites);
    }

    public function inviteUser($gameId, UserInterface $user, Request $request) {
        $gameId = new Uuid($gameId);
        $data = \json_decode($request->getContent(), true);
        $invite = new GameInvite($data["email"], $gameId);
        $this->inviteRepository->save($invite);

        $invites = $this->inviteRepository->listGameInvites($gameId);
        return new Response($invites);
    }

    public function cancelInvite($gameId, UserInterface $user, Request $request) {
        $gameId = new Uuid($gameId);
        $data = \json_decode($request->getContent(), true);
        $this->inviteRepository->remove($gameId, $data["email"]);

        $invites = $this->inviteRepository->listGameInvites($gameId);
        return new Response($invites);
    }
}
