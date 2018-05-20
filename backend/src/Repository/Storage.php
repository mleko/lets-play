<?php
declare(strict_types=1);

namespace Mleko\LetsPlay\Repository;

interface Storage
{
    public function getData(): array;

    public function saveData(array $data);
}
