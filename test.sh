#!/bin/bash

git fetch origin
previous_commit=$(git rev-parse HEAD^)
changes=$(git diff $previous_commit -- api/contracts/)
git diff $previous_commit -- api/contracts/
echo $previous_commit
if [ -z "$changes" ]; then
    echo "Không có thay đổi trong mã thông minh."
else
    echo "Có sự thay đổi trong mã thông minh. Tiến hành triển khai..."
    # Thực hiện quá trình triển khai ở đây
fi