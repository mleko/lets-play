<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Controller;

class IndexController
{

    public function index() {
        return new \Symfony\Component\HttpFoundation\JsonResponse(
            [
                "module" => "lets-play"
            ]
        );
    }

}
