<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Repository\BetsRepository;
use Mleko\LetsPlay\ValueObject\MatchScore;
use Mleko\LetsPlay\ValueObject\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class BetsController
{
    /** @var BetsRepository */
    private $betRepository;

    /**
     * BetsController constructor.
     * @param BetsRepository $betRepository
     */
    public function __construct(BetsRepository $betRepository) {
        $this->betRepository = $betRepository;
    }

    public function listAll($gameId, UserInterface $authUser) {
        $user = $authUser->getUser();
        $gameId = new Uuid($gameId);

        return new \Mleko\LetsPlay\Http\Response($this->betRepository->getUserGameBets($user->getId(), $gameId));
    }

    public function update($gameId, Request $request, UserInterface $authUser) {
        $data = \json_decode($request->getContent(), true);
        /** @var User $user */
        $user = $authUser->getUser();
        $gameId = new Uuid($gameId);
        $bets = $this->unserialize($data, $user->getId(), $gameId);

        $this->betRepository->saveMany($bets, true);

        return new \Mleko\LetsPlay\Http\Response($this->betRepository->getUserGameBets($user->getId(), $gameId));
    }

    /**
     * @param array $data
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return Bet[]
     */
    private function unserialize(array $data, Uuid $userId, Uuid $gameId) {
        $bets = [];
        foreach ($data as $row) {
            if (!isset($row["bet"], $row["bet"]["home"], $row["bet"]["away"])) {
                continue;
            }
            $bets[] = new Bet($userId, $gameId, new Uuid($row["matchId"]), new MatchScore($row["bet"]["home"], $row["bet"]["away"]));
        }
        return $bets;
    }
}
