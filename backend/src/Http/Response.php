<?php

declare(strict_types=1);

namespace Mleko\LetsPlay\Http;

class Response
{
    /** @var bool */
    private $success;

    /** @var mixed */
    private $data;

    public function __construct($data, bool $success = true) {
        $this->success = $success;
        $this->data = $data;
    }

    public function isSuccess(): bool {
        return $this->success;
    }

    /**
     * @return mixed
     */
    public function getData() {
        return $this->data;
    }

}
