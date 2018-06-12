<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Bet;
use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Entity\Match;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Logic\ScoreCalculator;
use Mleko\LetsPlay\Repository\BetsRepository;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\Repository\MatchSetRepository;
use Mleko\LetsPlay\Repository\UserRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class RankingController
{
    /** @var GameRepository */
    private $gameRepository;
    /** @var MatchSetRepository */
    private $matchSetRepository;
    /** @var BetsRepository */
    private $betRepository;
    /** @var UserRepository */
    private $userRepository;

    /**
     * RankingController constructor.
     * @param GameRepository $gameRepository
     * @param MatchSetRepository $matchSetRepository
     * @param BetsRepository $betRepository
     * @param UserRepository $userRepository
     */
    public function __construct(GameRepository $gameRepository, MatchSetRepository $matchSetRepository, BetsRepository $betRepository, UserRepository $userRepository) {
        $this->gameRepository = $gameRepository;
        $this->matchSetRepository = $matchSetRepository;
        $this->betRepository = $betRepository;
        $this->userRepository = $userRepository;
    }

    public function getRanking($gameId, GameUserRepository $gameUserRepository) {
        $game = $this->gameRepository->getGame($gameId);
        $set = $this->matchSetRepository->getSet($game->getMatchSetId());
        $bets = $this->betRepository->getGameBets($game->getId());
        $gameUsers = $gameUserRepository->getGameUsers($game->getId());

        $userIds = \array_map(function (GameUser $user) {
            return $user->getUserId();
        }, $gameUsers);
        $userIds[] = $game->getOwnerId();

        $calculator = new ScoreCalculator();
        $ranking = $this->buildRanking($set->getMatches(), $bets, $calculator, $userIds);

        $users = $this->userRepository->getMany(\array_map(function ($entry) {
            return $entry["userId"];
        }, $ranking));
        $keyedUsers = [];
        foreach ($users as $user) {
            $keyedUsers[$user->getId()->getUuid()] = $user;
        }
        $ranking = \array_map(function ($entry) use ($keyedUsers) {
            $entry["user"] = $keyedUsers[$entry["userId"]->getUuid()];
            return $entry;
        }, $ranking);

        return new Response($ranking);
    }

    /**
     * @param Match[] $matches
     * @param Bet[] $bets
     * @param ScoreCalculator $calculator
     * @param Uuid[] $userIds
     * @return array
     */
    private function buildRanking($matches, $bets, $calculator, $userIds): array {
        $ranking = [];
        $keyedMatches = [];

        foreach ($userIds as $userId) {
            $ranking[$userId->getUuid()] = ["userId" => $userId, "points" => 0];
        }

        foreach ($matches as $match) {
            $keyedMatches[$match->getId()->getUuid()] = $match;
        }
        foreach ($bets as $bet) {
            $matchResult = isset($keyedMatches[$bet->getMatchId()->getUuid()]) ? $keyedMatches[$bet->getMatchId()->getUuid()]->getResult() : null;
            if (null === $matchResult) {
                continue;
            }
            $points = $calculator->calculateScore($matchResult, $bet->getBet());
            if (!isset($ranking[$bet->getUserId()->getUuid()])) {
                $ranking[$bet->getUserId()->getUuid()] = ["userId" => $bet->getUserId(), "points" => 0];
            }
            $ranking[$bet->getUserId()->getUuid()]["points"] += $points;
        }

        \usort($ranking, function ($a, $b) {
            return -($a["points"] - $b["points"]);
        });

        return \array_values($ranking);
    }
}
