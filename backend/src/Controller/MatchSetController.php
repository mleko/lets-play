<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;


use Mleko\LetsPlay\Entity\Match;
use Mleko\LetsPlay\Entity\MatchSet;
use Mleko\LetsPlay\Repository\MatchSetRepository;
use Mleko\LetsPlay\ValueObject\MatchTeam;
use Symfony\Component\HttpFoundation\Request;

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

    public function create(Request $request) {
        $data = \json_decode($request->getContent(), true);
        $set = $this->denormalize($data);
        $this->matchSetRepository->save($set);
        return new \Mleko\LetsPlay\Http\Response($set);
    }

    public function update(Request $request, $setId) {
        $data = \json_decode($request->getContent(), true);
        $set = $this->denormalize($data, $setId);
        $this->matchSetRepository->save($set);
        return new \Mleko\LetsPlay\Http\Response($set);
    }

    public function listAll() {
        return new \Mleko\LetsPlay\Http\Response(\array_values($this->matchSetRepository->getSets()));
    }

    public function get($setId) {
        return new \Mleko\LetsPlay\Http\Response($this->matchSetRepository->getSet($setId));
    }

    /**
     * @param $data
     * @param null $id
     * @return MatchSet
     */
    private function denormalize($data, $id = null): MatchSet {
        $matches = [];
        foreach ($data["matches"] as $match) {
            $matches[] = new Match(
                new MatchTeam($match["home"]["name"], $match["home"]["score"] ?? null),
                new MatchTeam($match["away"]["name"], $match["away"]["score"] ?? null)
            );
        }
        $set = new MatchSet($data["name"], $matches, null === $id ? null : new \Mleko\LetsPlay\ValueObject\Uuid($id));
        return $set;
    }
}
