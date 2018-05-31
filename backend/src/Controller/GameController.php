<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\Game;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\Security\UserActor;
use Mleko\LetsPlay\ValueObject\Uuid;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class GameController
{
    /** @var GameRepository */
    private $gameRepository;

    /**
     * MatchSetController constructor.
     * @param GameRepository $gameRepository
     */
    public function __construct(GameRepository $gameRepository) {
        $this->gameRepository = $gameRepository;
    }

    public function create(Request $request, UserActor $user) {
        $data = \json_decode($request->getContent(), true);
        $game = $this->denormalize($data, $user->getUser());
        $this->gameRepository->save($game);
        return new \Mleko\LetsPlay\Http\Response($game);
    }

    public function update(Request $request, $gameId, UserActor $user) {
        $data = \json_decode($request->getContent(), true);
        $game = $this->gameRepository->getGame($gameId);
        $game->setName($data["name"]);
        $this->gameRepository->save($game);
        return new \Mleko\LetsPlay\Http\Response($game);
    }

    public function listAll(UserActor $user) {
        $input = $this->gameRepository->getUserGames($user->getUser()->getId());
        return new \Mleko\LetsPlay\Http\Response(\array_values($input));
    }

    public function get($gameId) {
        return new \Mleko\LetsPlay\Http\Response($this->gameRepository->getGame($gameId));
    }

    /**
     * @param $data
     * @param User $user
     * @param null|string $id
     * @return Game
     */
    private function denormalize($data, User $user, $id = null): Game {
        return new Game($data["name"], new Uuid($data["matchSetId"]), $user->getId(), null === $id ? null : new Uuid($id));
    }
}
