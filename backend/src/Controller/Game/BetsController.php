<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Entity\Match;
use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Entity\User;
use Mleko\LetsPlay\Http\Response;
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
        $gameId = Uuid::fromString($gameId);

        $bets = $this->betRepository->getUserGameBets($user->getId(), $gameId);
        if ($request->query->get("include_points")) {
            $game = $this->gameRepository->getGame($gameId->getUuid());
            $set = $this->matchSetRepository->getSet($game->getMatchSetId());
            $bets = $this->createBetViews($bets, $set);
        }
        return new Response($bets);
    }

    public function update($gameId, Request $request, UserActor $authUser) {
        $now = new \DateTimeImmutable();
        $data = \json_decode($request->getContent(), true);
        /** @var User $user */
        $user = $authUser->getUser();
        $gameId = new Uuid($gameId);
        $game = $this->gameRepository->getGame($gameId->getUuid());
        if (!$game) {
            return new Response(["message" => "Game not found"], false, 404);
        }
        try {
            $bets = $this->unserialize($data, $user->getId(), $gameId);
        } catch (\InvalidArgumentException $exception) {
            return new Response(["message" => $exception->getMessage()], false, 400);
        }

        $set = $this->matchSetRepository->getSet($game->getMatchSetId());
        $matches = $set->getMatches();
        $matchesById = [];
        foreach ($matches as $match) {
            $matchesById[$match->getId()->getUuid()] = $match->isLocked($now);
        }
        foreach ($bets as $bet) {
            if (!\array_key_exists($bet->getMatchId()->getUuid(), $matchesById)) {
                return new Response(["message" => "Cannot bet non game match"], false, 401);
            }
            if ($matchesById[$bet->getMatchId()->getUuid()]) {
                return new Response(["message" => "Cannot bet past match"], false, 401);
            }
        }

        $this->betRepository->saveMany($bets, true);

        return new Response($this->betRepository->getUserGameBets($user->getId(), $gameId));
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
            $home = $row["bet"]["home"];
            $away = $row["bet"]["away"];
            if (false === \filter_var($home, \FILTER_VALIDATE_INT) || $home <= 0) {
                throw new \InvalidArgumentException("Invalid home value");
            }
            if (false === \filter_var($away, \FILTER_VALIDATE_INT) || $away <= 0) {
                throw new \InvalidArgumentException("Invalid away value");
            }
            $bets[] = new Bet($userId, $gameId, new Uuid($row["matchId"]), new MatchScore((int)$home, (int)$away));
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
