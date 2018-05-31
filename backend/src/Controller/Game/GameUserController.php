<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Controller\Game;


use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Http\Response;
use Mleko\LetsPlay\Repository\Game\GameUserRepository;
use Mleko\LetsPlay\Repository\GameRepository;
use Mleko\LetsPlay\Repository\UserRepository;
use Mleko\LetsPlay\Security\UserActor;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameUserController
{
    /** @var GameRepository */
    private $gameRepository;
    /** @var GameUserRepository */
    private $gameUserRepository;
    /** @var UserRepository */
    private $userRepository;

    /**
     * InvitesController constructor.
     * @param GameRepository $gameRepository
     * @param GameUserRepository $gameUserRepository
     * @param UserRepository $userRepository
     */
    public function __construct(GameRepository $gameRepository, GameUserRepository $gameUserRepository, UserRepository $userRepository) {
        $this->gameRepository = $gameRepository;
        $this->gameUserRepository = $gameUserRepository;
        $this->userRepository = $userRepository;
    }


    public function listUsers($gameId, UserActor $user) {
        $game = $this->gameRepository->getGame($gameId);
        $gameUsers = $this->gameUserRepository->getGameUsers(Uuid::fromString($gameId));
        $userIds = \array_map(function (GameUser $gu) {
            return $gu->getUserId();
        }, $gameUsers);
        $userIds[] = $game->getOwnerId();
        $users = $this->userRepository->getMany($userIds);

        return new Response($users);
    }

}
