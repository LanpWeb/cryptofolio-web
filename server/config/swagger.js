const swaggerOptions = {
  spec: {
    swagger: "2.0",
    info: {
      description: "An Open Source project for monitoring crypto coins and your portfolio.",
      version: "1.0.0",
      title: "Cryprofolio"
    },
    host: "localhost:3004",
    basePath: "/api",
    tags: [{
      name: "auth",
      description: "Authorization"
    },
    {
      name: "portfolio",
      description: "Portfolio"
    },
    {
      name: "cryptocurrency",
      description: "Cryptocurrency"
    },
    {
      name: "watchlist",
      description: "Watchlist"
    },
    {
      name: "transactions",
      description: "Transactions"
    },
    {
      name: "settings",
      description: "Settings"
    }
    ],
    schemes: ["https", "http"],
    paths: {
      "/sign-in": {
        post: {
          tags: ["auth"],
          summary: "Sign in action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string"
                },
                password: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
        }
      },
      "/sign-up": {
        post: {
          tags: ["auth"],
          summary: "Sign up action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string"
                },
                password: {
                  type: "string"
                },
                confirmPassword: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
        }
      },
      "/verify-jwt": {
        post: {
          tags: ["auth"],
          summary: "Verify access token action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                accessToken: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
        }
      },
      "/refresh-token": {
        post: {
          tags: ["auth"],
          summary: "Get new refresh token action",
          responses: {
            200: {}
          },
        }
      },
      "/logout": {
        post: {
          tags: ["auth"],
          summary: "Logout action",
          responses: {
            200: {}
          },
        }
      },
      "/forced-logout": {
        post: {
          tags: ["auth"],
          summary: "Forced logout action",
          responses: {
            200: {}
          },
        }
      },
      "/devices-logout": {
        post: {
          tags: ["auth"],
          summary: "Logout from all devices action",
          responses: {
            200: {}
          },
        }
      },
      "/portfolio/holdings": {
        get: {
          tags: ["portfolio"],
          summary: "Portfolio information action",
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        }
      },
      "/portfolio/stats": {
        get: {
          tags: ["portfolio"],
          summary: "Portfolio statistics action",
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        }
      },
      "/user": {
        get: {
          tags: ["portfolio"],
          summary: "Get user information action",
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        }
      },
      "/watchlist": {
        get: {
          tags: ["watchlist"],
          summary: "Get user's watchlist action",
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        },
        post: {
          tags: ["watchlist"],
          summary: "Toggle watchlist's coin action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                coin: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        }
      },
      "/transactions": {
        get: {
          tags: ["transactions"],
          summary: "Get user's transactions action",
          parameters: [{
            name: "start",
            in: "query",
            description: "Should start from zero",
            required: true,
            type: "integer"
          },
          {
            name: "limit",
            in: "query",
            description: "",
            required: true,
            type: "integer"
          }],
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        },
        post: {
          tags: ["transactions"],
          summary: "Create new user's transaction action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                type: {
                  type: "string"
                },
                coin: {
                  type: "string"
                },
                amount: {
                  type: "integer"
                },
                price: {
                  type: "integer"
                },
                date: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        }
      },
      "/transactions/{transactionId}": {
        put: {
          tags: ["transactions"],
          summary: "Edit user's transaction action",
          parameters: [{
            in: "path",
            name: "transactionId",
            type: "string",
            required: true,
            description: ""
          }, {
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                type: {
                  type: "string"
                },
                coin: {
                  type: "string"
                },
                amount: {
                  type: "integer"
                },
                price: {
                  type: "integer"
                },
                date: {
                  type: "string"
                }
              }
            }
          }],
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        },
        delete: {
          tags: ["transactions"],
          summary: "Delete user's transaction action",
          parameters: [{
            in: "path",
            name: "transactionId",
            type: "string",
            required: true,
            description: ""
          }],
          responses: {
            200: {}
          },
          security: [{
            Bearer: []
          }]
        },
      },
      "/change-password": {
        post: {
          tags: ["settings"],
          summary: "Change password action",
          parameters: [{
            in: "body",
            name: "body",
            description: "",
            required: true,
            schema: {
              type: "object",
              properties: {
                password: {
                  type: "string"
                },
                confirmPassword: {
                  type: "string"
                },
                newPassword: {
                  type: "string"
                }
              }
            }
          }],
          security: [{
            Bearer: []
          }],
          responses: {
            200: {}
          },
        }
      },
      "/cryptocurrency/graph": {
        get: {
          tags: ["cryptocurrency"],
          summary: "Get cryptocurrency graph action",
          parameters: [{
            name: "id",
            in: "query",
            description: "Cryptocurrency id",
            required: true,
            type: "integer"
          },
          {
            name: "period",
            in: "query",
            description: "Example: day",
            required: true,
            type: "string"
          }],
          responses: {
            200: {}
          }
        }
      },
      "/cryptocurrency/info/{slug}": {
        get: {
          tags: ["cryptocurrency"],
          summary: "Get cryptocurrency info action",
          parameters: [{
            in: "path",
            name: "slug",
            type: "string",
            required: true,
            description: ""
          }, {
            name: "id",
            in: "query",
            description: "Should start from 1",
            required: true,
            type: "integer"
          },
          {
            name: "period",
            in: "query",
            description: "Example: day",
            required: true,
            type: "string"
          }],
          responses: {
            200: {}
          }
        }
      },
      "/cryptocurrency/latest": {
        get: {
          tags: ["cryptocurrency"],
          summary: "Get latest cryptocurrency action",
          parameters: [{
            name: "start",
            in: "query",
            description: "Should start from 1",
            required: true,
            type: "integer"
          },
          {
            name: "limit",
            in: "query",
            description: "",
            required: true,
            type: "integer"
          }],
          responses: {
            200: {}
          }
        }
      },
      "/cryptocurrency/map": {
        get: {
          tags: ["cryptocurrency"],
          summary: "Get map cryptocurrency for search action",
          responses: {
            200: {}
          }
        }
      },
      "/cryptocurrency/global-stats": {
        get: {
          tags: ["cryptocurrency"],
          summary: "Get global cryptocurrency stats action",
          responses: {
            200: {}
          }
        }
      }
    },
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header"
      }
    },
    externalDocs: {
      description: "Find out more about Swagger",
      url: "http://swagger.io"
    }
  }
};

module.exports = swaggerOptions;
