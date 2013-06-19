class CreateTweets < ActiveRecord::Migration
  def change
    create_table :tweets
      t.references  :user    
  end
end
