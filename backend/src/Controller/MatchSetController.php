<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\Match;
use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Repository\MatchSetRepository;
use Mleko\LetsPlay\Security\UserActor;
use Mleko\LetsPlay\ValueObject\MatchTeam;
use Mleko\LetsPlay\ValueObject\Uuid;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class MatchSetController
{
    /** @var MatchSetRepository */
    private $matchSetRepository;

    /**
     * MatchSetController constructor.
     * @param MatchSetRepository $matchSetRepository
     */
    public function __construct(MatchSetRepository $matchSetRepository) {
        $this->matchSetRepository = $matchSetRepository;
    }

    public function create(Request $request, UserActor $user) {
        $data = \json_decode($request->getContent(), true);
        $set = new MatchSet($data["name"], $user->getUser()->getId());
        $set->setMatches($this->denormalizeMatches($data["matches"], $set));
        $this->matchSetRepository->save($set);
        return new \Mleko\LetsPlay\Http\Response($set);
    }

    public function update(Request $request, $setId, UserActor $user) {
        $set = $this->matchSetRepository->getSet(Uuid::fromString($setId));
        if (!$set || !$set->getOwnerId()->equals($user->getUser()->getId())) {
            throw new NotFoundHttpException();
        }
        $data = \json_decode($request->getContent(), true);
        $set->setName($data["name"]);
        $matches = $set->getMatches();
        $requestMatches = $this->denormalizeMatches($data["matches"], $set);
        $updatedMatches = [];
        foreach ($requestMatches as $match) {
            $m = $this->findMatch($matches, $match->getId());
            if ($m) {
                $m->setStartDate($match->getStartDate());
                $m->getHome()->setName($match->getHome()->getName());
                $m->getHome()->setScore($match->getHome()->getScore());
                $m->getAway()->setName($match->getAway()->getName());
                $m->getAway()->setScore($match->getAway()->getScore());
                $updatedMatches[] = $m;
            } else {
                $updatedMatches[] = $match;
            }
        }
        $set->setMatches($updatedMatches);
        $this->matchSetRepository->save($set);
        return new \Mleko\LetsPlay\Http\Response($set);
    }

    public function listAll(UserActor $actor) {
        return new \Mleko\LetsPlay\Http\Response(\array_values($this->matchSetRepository->getUserSets($actor->getUser(), true)));
    }

    public function get($setId) {
        $matchSet = $this->matchSetRepository->getSet(Uuid::fromString($setId));
        if (!$matchSet) {
            throw new NotFoundHttpException();
        }
        return new \Mleko\LetsPlay\Http\Response($matchSet);
    }

    /**
     * @param array $requestedMatches
     * @param MatchSet $set
     * @return Match[]
     */
    private function denormalizeMatches(array $requestedMatches, MatchSet $set): array {
        $matches = [];
        foreach ($requestedMatches as $match) {
            $matches[] = new Match(
                new MatchTeam($match["home"]["name"], $match["home"]["score"] ?? null),
                new MatchTeam($match["away"]["name"], $match["away"]["score"] ?? null),
                new \DateTimeImmutable($match["startDate"]),
                $set,
                isset($match["id"]) && $match["id"] ? new Uuid($match["id"]) : null
            );
        }
        return $matches;
    }


    /**
     * @param Match[] $matches
     * @param Uuid $matchId
     * @return mixed|Match|null
     */
    private function findMatch(array $matches, Uuid $matchId): ?Match {
        foreach ($matches as $match) {
            if ($match->getId()->equals($matchId)) {
                return $match;
            }
        }
        return null;
    }
}
