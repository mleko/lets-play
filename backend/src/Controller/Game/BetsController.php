<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Entity\Match;
use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Repository\BetsRepository;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\Repository\MatchSetRepository;
use Mleko\LetsPlay\Security\UserActor;
use Mleko\LetsPlay\ValueObject\MatchScore;
use Mleko\LetsPlay\ValueObject\Uuid;
use Mleko\LetsPlay\View\BetView;
use Symfony\Component\HttpFoundation\Request;

class BetsController
{
    /** @var BetsRepository */
    private $betRepository;
    /** @var MatchSetRepository */
    private $matchSetRepository;
    /** @var GameRepository */
    private $gameRepository;

    /**
     * BetsController constructor.
     * @param BetsRepository $betRepository
     * @param MatchSetRepository $matchSetRepository
     * @param GameRepository $gameRepository
     */
    public function __construct(BetsRepository $betRepository, MatchSetRepository $matchSetRepository, GameRepository $gameRepository) {
        $this->betRepository = $betRepository;
        $this->matchSetRepository = $matchSetRepository;
        $this->gameRepository = $gameRepository;
    }

    public function listAll($gameId, UserActor $authUser, Request $request) {
        /** @var User $user */
        $user = $authUser->getUser();
        $gameId = new Uuid($gameId);

        $bets = $this->betRepository->getUserGameBets($user->getId(), $gameId);
        if ($request->query->get("include_points")) {
            $game = $this->gameRepository->getGame($gameId->getUuid());
            $set = $this->matchSetRepository->getSet($game->getMatchSetId()->getUuid());
            $bets = $this->createBetViews($bets, $set);
        }
        return new \Mleko\LetsPlay\Http\Response($bets);
    }

    public function update($gameId, Request $request, UserActor $authUser) {
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

    /**
     * @param Bet[] $bets
     * @param MatchSet $set
     * @return BetView[]
     */
    private function createBetViews($bets, MatchSet $set): array {
        $views = [];
        /** @var Match[] $matches */
        $matches = [];
        foreach ($set->getMatches() as $match) {
            if ($match->isLocked()) {
                $matches[$match->getId()->getUuid()] = $match;
            }
        }
        $calculator = new \Mleko\LetsPlay\Logic\ScoreCalculator();
        foreach ($bets as $bet) {
            $points = null;
            $matchResult = isset($matches[$bet->getMatchId()->getUuid()]) ? $matches[$bet->getMatchId()->getUuid()]->getResult() : null;
            if ($matchResult) {
                $points = $calculator->calculateScore($matchResult, $bet->getBet());
            }
            $views[] = new BetView($bet, $points);
        }
        return $views;
    }
}
