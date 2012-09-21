# encoding: utf-8

##
# Backup Generated: klog
# Once configured, you can run the backup with the following command:
#
# $ backup perform -t klog [-c <path_to_configuration_file>]
#
Backup::Model.new(:klog, 'Backup db & upload for klog') do
  ##
  # Split [Splitter]
  #
  # Split the backup file in to chunks of 250 megabytes
  # if the backup file size exceeds 250 megabytes
  #
  split_into_chunks_of 250

  ##r
  # MySQL [Database]
  #
  database MySQL do |db|
    # To dump all databases, set `db.name = :all` (or leave blank)
    db.name               = "klog"
    db.username           = "root"
    db.password           = "root"
    db.host               = "localhost"
    db.port               = 3306
    # Note: when using `skip_tables` with the `db.name = :all` option,
    # table names should be prefixed with a database name.
    # e.g. ["db_name.table_to_skip", ...]
    db.additional_options = ["--quick", "--single-transaction"]
    # Optional: Use to set the location of this utility
    #   if it cannot be found by name in your $PATH
    # db.mysqldump_utility = "/opt/local/bin/mysqldump"
  end

  archive :uploads do |archive|
    archive.add '~/klog/shared/uploads'
  end

  ##
  # Dropbox File Hosting Service [Storage]
  #
  # Access Type:
  #
  #  - :app_folder (Default)
  #  - :dropbox
  #
  # Note:
  #
  #  Initial backup must be performed manually to authorize
  #  this machine with your Dropbox account.
  #
  store_with Dropbox do |db|
    db.api_key     = ""
    db.api_secret  = ""
    db.access_type = :app_folder
    db.path        = "backup"
    db.keep        = 5
  end

  ##
  # Gzip [Compressor]
  #
  compress_with Gzip do |compression|
    compression.level = 6
  end

end