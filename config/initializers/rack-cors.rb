# frozen_string_literal: true

if defined? Rack::Cors
  Rails.configuration.middleware.insert_before 0, Rack::Cors do
    allow do
      origins %W[
        #{ENV["APP_BASE_URL"]}
        #{ENV["CLOUDFRONT_ASSET_HOST"]}
        https://miru-staging.fly.dev
        https://miru-production.fly.dev
        localhost:3000
      ]
      resource "/assets/*"
    end
  end
end
