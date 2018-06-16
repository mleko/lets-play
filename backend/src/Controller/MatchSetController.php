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
        $set = $this->denormalize($data, $user->getUser()->getId());
        $this->matchSetRepository->save($set);
        return new \Mleko\LetsPlay\Http\Response($set);
    }

    public function update(Request $request, $setId, UserActor $user) {
        $set = $this->matchSetRepository->getSet(Uuid::fromString($setId));
        if (!$set || !$set->getOwnerId()->equals($user->getUser()->getId())) {
            throw new NotFoundHttpException();
        }
        $data = \json_decode($request->getContent(), true);
        $set = $this->denormalize($data, $user->getUser()->getId(), $setId, $set->isPublic());
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
     * @param $data
     * @param Uuid $userId
     * @param string|null $id
     * @return MatchSet
     */
    private function denormalize($data, Uuid $userId, $id = null, $public = false): MatchSet {
        $matches = [];
        foreach ($data["matches"] as $match) {
            $matches[] = new Match(
                new MatchTeam($match["home"]["name"], $match["home"]["score"] ?? null),
                new MatchTeam($match["away"]["name"], $match["away"]["score"] ?? null),
                new \DateTimeImmutable($match["startDate"]),
                isset($match["id"]) && $match["id"] ? new Uuid($match["id"]) : null
            );
        }
        $set = new MatchSet($data["name"], $userId, $matches, null === $id ? null : new Uuid($id), $public);
        return $set;
    }
}
