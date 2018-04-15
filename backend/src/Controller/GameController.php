<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\Game;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\ValueObject\Uuid;
use Symfony\Component\HttpFoundation\Request;

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

    public function create(Request $request) {
        $data = \json_decode($request->getContent(), true);
        $game = $this->denormalize($data);
        $this->gameRepository->save($game);
        return new \Mleko\LetsPlay\Http\Response($game);
    }

    public function update(Request $request, $gameId) {
        $data = \json_decode($request->getContent(), true);
        $game = $this->denormalize($data, $gameId);
        $this->gameRepository->save($game);
        return new \Mleko\LetsPlay\Http\Response($game);
    }

    public function listAll() {
        return new \Mleko\LetsPlay\Http\Response(\array_values($this->gameRepository->getGames()));
    }

    public function get($gameId) {
        return new \Mleko\LetsPlay\Http\Response($this->gameRepository->getGame($gameId));
    }

    /**
     * @param $data
     * @param null $id
     * @return Game
     */
    private function denormalize($data, $id = null): Game {
        return new Game($data["name"], new Uuid($data["matchSetId"]), null === $id ? null : new Uuid($id));
    }
}
