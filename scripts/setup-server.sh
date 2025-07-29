#!/bin/bash

# Conoha VPS AlmaLinux 9サーバーの初期設定スクリプト
# このスクリプトはサーバー側で実行します

# リポジトリのクローン（初回のみ）
if [ ! -d "/var/www/vhosts/task.sho43.xyz" ]; then
    sudo mkdir -p /var/www/vhosts/task.sho43.xyz
    cd /var/www/vhosts
    sudo git clone https://github.com/YOUR_USERNAME/task-manage.git task.sho43.xyz
fi

# Apache設定ファイルの作成（AlmaLinux用）
sudo tee /etc/httpd/conf.d/task.sho43.xyz.conf > /dev/null <<EOL
<VirtualHost *:80>
    ServerName task.sho43.xyz
    DocumentRoot /var/www/vhosts/task.sho43.xyz
    
    <Directory /var/www/vhosts/task.sho43.xyz>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog /var/log/httpd/task.sho43.xyz-error.log
    CustomLog /var/log/httpd/task.sho43.xyz-access.log combined
</VirtualHost>
EOL

# ファイルの所有者とパーミッションを設定
sudo chown -R deploy:apache /var/www/vhosts/task.sho43.xyz
sudo chmod -R 755 /var/www/vhosts/task.sho43.xyz

# SELinuxコンテキストを設定（AlmaLinuxはSELinuxがデフォルトで有効）
sudo semanage fcontext -a -t httpd_sys_content_t "/var/www/vhosts/task.sho43.xyz(/.*)?"
sudo restorecon -Rv /var/www/vhosts/task.sho43.xyz

# httpdを再起動
sudo systemctl restart httpd
sudo systemctl enable httpd

echo "セットアップが完了しました！"