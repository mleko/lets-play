<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Game\GameInvite;
use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\Game\GameInviteRepository;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\Security\UserActor;
use Mleko\LetsPlay\ValueObject\Uuid;
use Mleko\LetsPlay\View\GameInvitationView;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Zend\Mail\Message;
use Zend\Mail\Transport\TransportInterface;
use Zend\Mime\Mime;
use Zend\Mime\Part;

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

    public function inviteUser($gameId, UserActor $user, Request $request, TransportInterface $transport) {
        $gameId = new Uuid($gameId);
        $data = \json_decode($request->getContent(), true);
        $invite = new GameInvite($gameId);
        $this->inviteRepository->save($invite);

        $email = $data["email"];
        if ($email) {
            $game = $this->gameRepository->getGame($invite->getGameId()->getUuid());
            $message = new Message();
            $message->setTo($email);
            $message->addFrom("no-reply@lets-play.pl", "Lets Play");
            $message->setSubject("Zaproszenie - " . $game->getName() . " - Lets-Play");
            $body = new Part(sprintf(
                "Cześć,\n\n%s zaprasza Cię do udziału w rozgrywce: %s.\nPoniżej link z zaproszeniem\n%s\n\nDobrej zabawy",
                $user->getUser()->getName(),
                $game->getName(),
                $request->getUriForPath("/#/invitation/" . $invite->getId())
            ));
            $body->charset = "UTF-8";
            $body->setType(Mime::TYPE_TEXT);
            $mimeMessage = new \Zend\Mime\Message();
            $mimeMessage->addPart($body);
            $message->setBody($mimeMessage);
            $transport->send($message);
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

    public function acceptInvitation(string $invitationId, UserActor $user) {
        $invitation = $this->inviteRepository->getGameInvitation($invitationId);
        if ($invitation->getStatus() !== GameInvite::STATUS_PENDING) {
            throw new NotFoundHttpException();
        }
        $invitation->markAccepted();
        $this->inviteRepository->save($invitation);
        $gameUser = new GameUser($invitation->getGameId(), $user->getUser()->getId());
        if(null === $this->gameUserRepository->getGameUser($user->getUser()->getId(), $invitation->getGameId())){
            $this->gameUserRepository->save($gameUser);
        }

        return new Response(null);
    }
}
