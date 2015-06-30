class AddRequestYesterdayMetric < ActiveRecord::Migration
  def change
    add_column :widgets, :request_yesterday, :boolean
  end
end
