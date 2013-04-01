set :rvm_type, :system
set :whenever_command, "bundle exec whenever"
require 'rvm/capistrano'
require "bundler/capistrano"
require "whenever/capistrano"

set :application, "klog"
set :repository,  "git://github.com/edokeh/klog.git"

set :scm, :git

server 'chaoskeh.com', :app, :web, :db, :primary=>true
set :use_sudo, false
set :user, 'test'
set :password, 'test'
set :deploy_to, '/home/test/klog'
set :deploy_via, :remote_cache
set :shared_children, shared_children + %w(public/uploads public/captcha)

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

namespace :deploy do
    task :start do ; end
    task :stop do ; end
    task :restart, :roles => :app, :except => { :no_release => true } do
        run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
    end

    desc <<-DESC
      Replace some config files after code ready
      Such as database.yml
    DESC
    task :replace_config do
        run "#{try_sudo} cp #{File.join(deploy_to,'config','*')} #{File.join(release_path,'config')}"
    end

    desc <<-DESC
      New deploy:cold
      Add `rake db:create` and `rake db:seed`
    DESC
    task :cold do
      update
      create_db
      migrate
      seed_db
      start
    end

    task :create_db do
      rake = fetch(:rake, "rake")
      rails_env = fetch(:rails_env, "production")
      migrate_env = fetch(:migrate_env, "")
      migrate_target = fetch(:migrate_target, :latest)

      directory = case migrate_target.to_sym
        when :current then current_path
        when :latest  then latest_release
        else raise ArgumentError, "unknown migration target #{migrate_target.inspect}"
        end

      run "cd #{directory} && #{rake} RAILS_ENV=#{rails_env} #{migrate_env} db:create"
    end

    task :seed_db do
      rake = fetch(:rake, "rake")
      rails_env = fetch(:rails_env, "production")
      migrate_env = fetch(:migrate_env, "")
      migrate_target = fetch(:migrate_target, :latest)

      directory = case migrate_target.to_sym
        when :current then current_path
        when :latest  then latest_release
        else raise ArgumentError, "unknown migration target #{migrate_target.inspect}"
        end

      run "cd #{directory} && #{rake} RAILS_ENV=#{rails_env} #{migrate_env} db:seed"
    end
    
    after 'deploy:finalize_update', 'deploy:replace_config'
end