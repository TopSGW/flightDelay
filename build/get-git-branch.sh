#!/usr/bin/env bash

fullbranch="$1" && branch=${fullbranch#"origin/"} && echo $branch
