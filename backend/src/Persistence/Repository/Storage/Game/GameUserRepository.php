<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Persistence\Repository\Storage\Game;


use Mleko\LetsPlay\Entity\Game\GameUser;
use Mleko\LetsPlay\Persistence\Repository\Storage\StorageRepository;
use Mleko\LetsPlay\ValueObject\Uuid;

class GameUserRepository extends StorageRepository implements \Mleko\LetsPlay\Repository\Game\GameUserRepository
{

    /**
     * @param Uuid $userId
     * @return GameUser[]
     */
    public function getUserGames(Uuid $userId) {
        /** @var GameUser[] $elements */
        $elements = $this->getElements();
        return \array_filter($elements, function (GameUser $e) use ($userId) {
            return $e->getUserId()->equals($userId);
        });
    }

    /**
     * @param Uuid $userId
     * @param Uuid $gameId
     * @return GameUser
     */
    public function getGameUser(Uuid $userId, Uuid $gameId): ?GameUser {
        /** @var GameUser[] $elements */
        $elements = $this->getElements();
        foreach ($elements as $element) {
            if ($element->getGameId()->equals($gameId) && $element->getUserId()->equals($userId)) {
                return $element;
            }
        }
        return null;
    }

    public function save(GameUser $gameUser) {
        $elements = $this->getElements();
        if ($this->getGameUser($gameUser->getUserId(), $gameUser->getGameId())) {
            return;
        }
        $elements[] = $gameUser;
        $this->saveElements($elements);
    }

    /**
     * @param Uuid $gameId
     * @return GameUser[]
     */
    public function getGameUsers(Uuid $gameId) {
        /** @var GameUser[] $elements */
        $elements = $this->getElements();
        return \array_values(\array_filter($elements, function (GameUser $e) use ($gameId) {
            return $e->getGameId()->equals($gameId);
        }));
    }

    protected function getElementClassName(): string {
        return GameUser::class;
    }

    protected function getStorageKey(): string {
        return "game.user";
    }

    /**
     * @return GameUser[]
     */
    public function getAll() {
        return $this->getElements();
    }
}
