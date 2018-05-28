<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\Game\GameInviteRepository;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\ValueObject\Uuid;
use Mleko\LetsPlay\View\GameInvitationView;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\User\UserInterface;

class InvitesController
{
    /** @var GameInviteRepository */
    private $inviteRepository;
    /** @var GameRepository */
    private $gameRepository;
    /** @var GameUserRepository */
    private $gameUserRepository;

    /**
     * InvitesController constructor.
     * @param GameInviteRepository $inviteRepository
     * @param GameRepository $gameRepository
     * @param GameUserRepository $gameUserRepository
     */
    public function __construct(GameInviteRepository $inviteRepository, GameRepository $gameRepository, GameUserRepository $gameUserRepository) {
        $this->inviteRepository = $inviteRepository;
        $this->gameRepository = $gameRepository;
        $this->gameUserRepository = $gameUserRepository;
    }

    public function getInvitation(string $invitationId) {
        /** @var GameInvite $invitation */
        $invitation = $this->inviteRepository->getGameInvitation($invitationId);
        if ($invitation->getStatus() !== GameInvite::STATUS_PENDING) {
            throw new NotFoundHttpException();
        }
        $game = $this->gameRepository->getGame($invitation->getGameId()->getUuid());
        return new Response(new GameInvitationView($invitation, $game));
    }

    public function inviteUser($gameId, UserInterface $user, Request $request) {
        $gameId = new Uuid($gameId);
        $data = \json_decode($request->getContent(), true);
        $invite = new GameInvite($gameId);
        $this->inviteRepository->save($invite);

        $email = $data["email"];
        if ($email) {
            // @todo send email
        }

        return new Response($invite);
    }

    public function cancelInvitation(string $invitationId) {
        /** @var GameInvite $invitation */
        $invitation = $this->inviteRepository->getGameInvitation($invitationId);
        $invitation->cancel();
        $this->inviteRepository->save($invitation);

        return new Response(null);
    }

    public function acceptInvitation(string $invitationId, UserInterface $user) {
        $invitation = $this->inviteRepository->getGameInvitation($invitationId);
        if ($invitation->getStatus() !== GameInvite::STATUS_PENDING) {
            throw new NotFoundHttpException();
        }
        $invitation->markAccepted();
        $this->inviteRepository->save($invitation);
        $gameUser = new GameUser($invitation->getGameId(), $user->getUser()->getId());
        $this->gameUserRepository->save($gameUser);

        return new Response(null);
    }
}
